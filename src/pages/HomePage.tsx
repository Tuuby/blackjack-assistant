import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import ExampleCard from "../components/exampleCard";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <ExampleCard />
    </Container>
  );
};

export default HomePage;
