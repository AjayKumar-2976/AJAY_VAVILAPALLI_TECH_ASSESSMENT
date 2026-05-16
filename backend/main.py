# from fastapi import FastAPI, Form

# app = FastAPI()

# @app.get('/')
# def read_root():
#     return {'Ping': 'Pong'}

# @app.get('/pipelines/parse')
# def parse_pipeline(pipeline: str = Form(...)):
#     return {'status': 'parsed'}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class PipelineData(BaseModel):
    nodes: List[dict]
    edges: List[dict]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# DAG Check Function
def is_dag(nodes, edges):
    graph = defaultdict(list)
    indegree = defaultdict(int)

    # Build graph
    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        graph[source].append(target)
        indegree[target] += 1

    # Queue for nodes with indegree 0
    queue = deque()

    node_ids = [node["id"] for node in nodes]

    for node_id in node_ids:
        if indegree[node_id] == 0:
            queue.append(node_id)

    visited = 0

    # Topological Sort
    while queue:
        node = queue.popleft()
        visited += 1

        for neighbor in graph[node]:
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)

    dag_status = is_dag(data.nodes, data.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status,
    }