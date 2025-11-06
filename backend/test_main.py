import pytest
from fastapi.testclient import TestClient
from main import app    # Import your FastAPI app

client = TestClient(app)

# 1. Test a simple, valid DAG
def test_valid_dag():
    payload = {
        "nodes": [
            {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
            {"id": "2", "type": "text", "position": {"x": 0, "y": 0}, "data": {}},
            {"id": "3", "type": "output", "position": {"x": 0, "y": 0}, "data": {}}
        ],
        "edges": [
            {"id": "e1-2", "source": "1", "target": "2", "type": "smoothstep"},
            {"id": "e2-3", "source": "2", "target": "3", "type": "smoothstep"}
        ]
    }
    response = client.post("/pipelines/parse", json=payload)
    data = response.json()

    assert response.status_code == 200
    assert data["num_nodes"] == 3
    assert data["num_edges"] == 2
    assert data["is_dag"] == True
    assert data["execution_order"] == ["1", "2", "3"] # Check the order

# 2. Test an invalid DAG with a cycle
def test_invalid_dag_with_cycle():
    payload = {
        "nodes": [
            {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
            {"id": "2", "type": "text", "position": {"x": 0, "y": 0}, "data": {}}
        ],
        "edges": [
            {"id": "e1-2", "source": "1", "target": "2", "type": "smoothstep"},
            {"id": "e2-1", "source": "2", "target": "1", "type": "smoothstep"} # Cycle!
        ]
    }
    response = client.post("/pipelines/parse", json=payload)
    data = response.json()

    assert response.status_code == 200
    assert data["num_nodes"] == 2
    assert data["num_edges"] == 2
    assert data["is_dag"] == False
    assert data["execution_order"] == []

# 3. Test the root endpoint
def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Ping": "Pong"}