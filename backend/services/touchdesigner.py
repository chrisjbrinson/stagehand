import requests


class TouchDesignerClient:
    def set_scene(self, installation_name: str, scene_name: str):

        payload = {
            "installation": installation_name,
            "scene": scene_name
        }

        response = requests.post(
            "http://192.168.224.1:9980/scene",
            json=payload,
            timeout=5
        )

        print(
            f"[TouchDesigner] {response.status_code} "
            f"{installation_name} -> {scene_name}"
        )
    
    def get_status(self):
        response = requests.get("http://192.168.224.1:9980/status", timeout=5)
        return response.json()