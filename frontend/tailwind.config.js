module.exports = {
    theme: {
        extend: {
            keyframes: {
                customBounce: {
                    // Define new keyframes for your custom bounce
                    "0%, 100%": {
                        transform: "translateY(-5%)",
                        "animation-timing-function":
                            "cubic-bezier(0.8, 0, 1, 1)",
                    },
                    "50%": {
                        transform: "none",
                        "animation-timing-function":
                            "cubic-bezier(0, 0, 0.2, 1)",
                    },
                },
            },
            animation: {
                bounce: "customBounce 1s infinite", // Apply your custom keyframes with desired duration
            },
        },
    },
    plugins: [],
};
