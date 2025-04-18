import os
from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation
from elevenlabs.conversational_ai.default_audio_interface import DefaultAudioInterface

agent_id = os.getenv("AGENT_ID", "urZyYi4Mwnf9bzfOCYve")
api_key = os.getenv("ELEVENLABS_API_KEY", "sk_f4d3ccd978451351ffbce773eba879dd91f33bd0e87d5108")

client = ElevenLabs(api_key=api_key)

conversation = Conversation(
    client=client,
    agent_id=agent_id,
    requires_auth=bool(api_key),
    audio_interface=DefaultAudioInterface(),
    callback_agent_response=lambda response: print(f"Agent: {response}"),
    callback_user_transcript=lambda transcript: print(f"User: {transcript}"),
)

conversation.start_session()
print("Prueba.py ejecutado correctamente.")
