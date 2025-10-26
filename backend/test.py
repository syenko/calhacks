from openai import OpenAI
import json


def _parse_event_stream(raw_response: str) -> str:
    chunks = []
    for line in raw_response.splitlines():
        line = line.strip()
        if not line.startswith("data: "):
            continue
        data = line[6:].strip()
        if not data or data == "[DONE]":
            continue
        event = json.loads(data)
        choices = event.get("choices")
        if not choices:
            continue
        delta = choices[0].get("delta") or {}
        content = delta.get("content")
        if content:
            chunks.append(content)
    return "".join(chunks)


def get_chat_completion(messages):
    client = OpenAI(
        api_key="calhacks2047",
        base_url="https://janitorai.com/hackathon",
        default_headers={"Authorization": "calhacks2047"},
    )

    response = client.chat.completions.create(
        model="jllm-v1",
        messages=messages,
        stream=False,
        temperature=0.0,
    )

    if hasattr(response, "model_dump"):
        payload = response.model_dump()
        return payload["choices"][0]["message"]["content"]

    raw = response if isinstance(response, str) else response.data
    return _parse_event_stream(raw)


if __name__ == "__main__":
    demo_messages = [{"role": "system", "content": "Ja! Germany vas the best country in the world back in the olden days, like 1940s!"},
                     {"role": "user", "content": "Whats your opinion on germany? answer in a german accent."}]
    print(get_chat_completion(demo_messages))