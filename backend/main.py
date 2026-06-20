from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class SceneUpdate(BaseModel):
    scene: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Installation(BaseModel):
    name: str
    status: str
    scene: str
    cpu: int | None
    memory: int | None
    uptime: str
    version: str

INSTALLATIONS = [
    Installation(
        name="Denver Trade Show",
        status="online",
        scene="Aurora",
        cpu=18,
        memory=42,
        uptime="12d 4h",
        version="1.2.2"
    ),
    Installation(
        name="Museum Exhibit",
        status="offline",
        scene="Particles",
        cpu=None,
        memory=None,
        uptime="12d 4h",
        version="1.2.0"
    )     
]

EVENTS = []

@app.get("/")
def root():
    return {
        "application": "Stagehand",
        "status": "online"
    }


@app.get("/installations")
def installations():
    return INSTALLATIONS

@app.get("/installations/{name}")
def get_installation(name: str):
    for installation in INSTALLATIONS:
        if installation.name == name:
            return installation

    return {"error": "Installation not found"}

@app.post("/installations/{name}/scene")
def update_scene(name: str, scene_update: SceneUpdate):
    for installation in INSTALLATIONS:
        if installation.name == name:
            installation.scene = scene_update.scene
            EVENTS.insert(
                0,
                {
                    "installation": installation.name,
                    "scene": scene_update.scene
                }
            )
            return installation

    return {"error": "Installation not found"}

@app.get("/events")
def get_events():
    return EVENTS