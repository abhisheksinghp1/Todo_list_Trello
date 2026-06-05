const socket = new WebSocket(
  "ws://127.0.0.1:8000/ws"
);

socket.onopen = () => {
  console.log("WebSocket Connected");
};

socket.onmessage = (event) => {
  console.log("WS Message:", event.data);
};

export default socket;