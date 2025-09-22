from langchain_groq import ChatGroq
from langgraph.graph import StateGraph
from langchain.globals import set_debug, set_verbose
from langgraph.prebuilt import create_react_agent
from langgraph.constants import END
from pydantic import BaseModel, Field
from prompts import *
from states import *
from tools import *
import os
from dotenv import load_dotenv
load_dotenv()
set_debug(True)
set_verbose(True)



llm = ChatGroq(model = "openai/gpt-oss-20b", api_key= os.getenv("GROQ_API_KEY"))


# Planner node
# prompt = planner_prompt(user_prompt)
def planner_agent(state: dict) -> dict:
    """Converts user prompt into a structured Plan."""
    user_prompt = state["user_prompt"]
    resp = llm.with_structured_output(Plan).invoke(
        planner_prompt(user_prompt)
    )
    if resp is None:
        raise ValueError("Planner did not return a valid response.")
    return {"plan": resp}


def architect_agent(state: dict) -> dict:
    plan: Plan = state["plan"]
    response = llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan))
    if response is None:
        raise ValueError("Architect did not return a valid response.")
    response.plan = plan
    return {"task_plan": response}


def coder_agent(state: dict) -> dict:
    coder_state: CoderState = state.get("coder_state")
    if coder_state is None:
        coder_state = CoderState(task_plan= state["task_plan"], current_step_idx=0)

    steps= coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state": coder_state, "status": "DONE"}
    # current_step_idx = 0
    current_task = steps[coder_state.current_step_idx]
    existing_content = read_file.run(current_task.filepath)
    user_prompt =(
        f"Task:{current_task.task_description}\n"
        f"File:{current_task.filepath}\n"
        f"Existing content: \n{existing_content}\n"
        f"Use write_file(path, content) to save your changes."
    )
    system_prompt = coder_system_prompt()
    # response =llm.invoke(system_prompt, user_prompt)
    coder_tools =[read_file, write_file, list_files, get_current_directory]
    react_agent =create_react_agent(llm, coder_tools)
    react_agent.invoke({
        "messages":[{"role":"system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}]
    })
    coder_state.current_step_idx+=1
    return {"coder_state": coder_state}

graph = StateGraph(dict)
graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_edge("planner", "architect")
graph.add_node("coder", coder_agent)
graph.add_edge("architect", "coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder":"coder"}
)
# graph.add_conditional_edges(
#     source="coder",
#     condition=lambda s: "END" if s.get("status") == "DONE" else "coder",
#     path_map={"END": END, "coder": "coder"}
# )


graph.set_entry_point("planner")

agent = graph.compile()


if __name__ == "__main__":

    user_prompt = "create a simple calculator web application."
    result = agent.invoke({"user_prompt": user_prompt},
                          {"recursion_limit": 100} )
    print(result)
