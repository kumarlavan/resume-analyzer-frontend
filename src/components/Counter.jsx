import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../features/counterSlice";
import { Button, Typography, Container } from "@mui/material";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h2">Counter: {count}</Typography>
      <Button variant="contained" color="primary" onClick={() => dispatch(increment())} style={{ margin: "10px" }}>
        Increment
      </Button>
      <Button variant="contained" color="secondary" onClick={() => dispatch(decrement())} style={{ margin: "10px" }}>
        Decrement
      </Button>
      <Button variant="contained" color="error" onClick={() => dispatch(reset())} style={{ margin: "10px" }}>
        Reset
      </Button>
    </Container>
  );
};

export default Counter;
