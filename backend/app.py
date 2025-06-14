from flask import Flask, request, jsonify
from flask_cors import CORS

# The backend kitchen
# This creates an instance of the Flask CLASS. This is our server.
app = Flask(__name__)

# CORS now allows us to make requests from the frontend.
# This is necessaary for the frontend to communicate with the backend.
CORS(app)

# This is the core logic of the Fibonacci sequence.


def calculate_fibonacci(n: int) -> int:
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b


# Now the API Endpoint (The waiter)
# This defines a "route" or an "endpoint". It's like a specific URL on our server.
# That the frontend can send requests to. We specity methods = ['POST'] to indicate that this endpoint will handle POST requests.


@app.route("/fibonacci", methods=["POST"])
def fibonacci():
    # 1. Get the data send from the frontend.
    # We expect the frontend to send a JSON object like {"number": 42}
    data = request.get_json()

    # 2. Check if the "number" key exists and is a valid integer.
    if not data or "number" not in data or not isinstance(data["number"], int):
        return (
            jsonify(
                {
                    "error": "Invalid input. Please provide a valid integer in the number field."
                }
            ),
            400,
        )

    # 3. Extract the number from the data.
    user_number = data["number"]

    # 4. Calculate the Fibonacci number.

    result = calculate_fibonacci(user_number)

    # 5. Send it back to the frontend in JSON format.
    # The frontend will receive something like: {"fibonacci": 55}
    return jsonify({"fibonacci": result})


# Finally this part allows us to run the server by simply executing this file.
# debug=True allows the server to automatically reload when we make changes to the code.

if __name__ == "__main__":
    app.run(debug=True, port=5000)
