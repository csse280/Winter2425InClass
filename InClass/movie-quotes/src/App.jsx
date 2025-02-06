import "./App.css";

function App() {

  function spikeTestRead() {
    console.log("TODO: Read from the firestore database");
  }
  function spikeTestWrite() {
    console.log("TODO: Write to the firestore database");
  }

  return (
    <>
      <button onClick={spikeTestRead}>Spike Read Test</button>
      <br />
      <br />
      <button onClick={spikeTestWrite}>Spike Write Test</button>
    </>
  );
}

export default App;
