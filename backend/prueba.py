import os
from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation
from elevenlabs.conversational_ai.default_audio_interface import DefaultAudioInterface

agent_id = os.getenv("AGENT_ID", "P1ORnc1dGjU8sp1tdcOu")
api_key = os.getenv("ELEVENLABS_API_KEY", "sk_386b88ea0d3f5a179966d43d402707446e97ad8f2b9449e1")

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
