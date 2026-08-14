import sys, json
from networkx.readwrite import json_graph
import networkx as nx
from pathlib import Path

data = json.loads(Path("graphify-out/graph.json").read_text(encoding="utf-8"))
G = json_graph.node_link_graph(data, edges="links")

question = "why does dependencies connect frontend npm dependencies to frontend dev dependencies"
terms = [t.lower() for t in question.split() if len(t) > 3]

scored = []
for nid, ndata in G.nodes(data=True):
    label = ndata.get("label", "").lower()
    score = sum(1 for t in terms if t in label)
    if score > 0:
        scored.append((score, nid))
scored.sort(reverse=True)
start_nodes = [nid for _, nid in scored[:3]]

subgraph_nodes = set(start_nodes)
subgraph_edges = []
frontier = set(start_nodes)
for _ in range(2):
    next_frontier = set()
    for n in frontier:
        for neighbor in G.neighbors(n):
            if neighbor not in subgraph_nodes:
                next_frontier.add(neighbor)
                subgraph_edges.append((n, neighbor))
    subgraph_nodes.update(next_frontier)
    frontier = next_frontier

print("Start:", [G.nodes[n].get("label", n) for n in start_nodes])
for nid in subgraph_nodes:
    d = G.nodes[nid]
    print(f"  NODE {d.get('label', nid)} [src={d.get('source_file','')}]")
for u, v in subgraph_edges:
    _raw = G[u][v]
    d = next(iter(_raw.values()), {}) if isinstance(G, nx.MultiGraph) else _raw
    print(f"  EDGE {G.nodes[u].get('label',u)} --{d.get('relation','')} [{d.get('confidence','')}]--> {G.nodes[v].get('label',v)}")
