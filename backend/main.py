from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any, Union

# Import CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    width: float | None = None
    height: float | None = None
    
class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: str | None = None
    animated: bool | None = None
    markerEnd: Dict[str, Any] | None = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# Helper Function: Topological Sort (Kahn Algorithm)
def get_pipeline_order(nodes: List[Node], edges: List[Edge]) -> Union[List[str], None]:
    """
    Performs a topological sort using Kahn's algorithm.
    Returns a list of node IDs in execution order if it's a DAG.
    Returns None if there is a cycle.
    """
    graph = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    node_ids = set(in_degree.keys())

    for edge in edges:
        # Ensure the edge connects valid nodes
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
            in_degree[edge.target] += 1
        
    queue = [node_id for node_id in in_degree if in_degree[node_id] == 0]
    
    sorted_order = [] # This will be our execution order

    while queue:
        u = queue.pop(0)
        sorted_order.append(u)
        
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # If there was a cycle, sorted_order will not include all nodes
    if len(sorted_order) == len(nodes):
        return sorted_order  # DAG!
    else:
        return None  # Cycle!

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """
    Receives pipeline data, calculates stats, 
    and checks for the execution order.
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # (Change is Here) ---
    execution_order = get_pipeline_order(pipeline.nodes, pipeline.edges)
    is_pipeline_dag = execution_order is not None

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_pipeline_dag,
        "execution_order": execution_order if is_pipeline_dag else [], # Send order if it's a DAG
    }