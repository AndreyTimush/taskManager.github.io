export default function Upload({ addTaskFromFile }) {
  const handleChange = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const arrayOfObjects = JSON.parse(e.target.result);
        addTaskFromFile(arrayOfObjects);
      } catch (error) {
        alert("Error! Please upload valid json file!");
      }
    };
  };

  return (
    <div className="container text-center">
      <input
        className="hidden"
        type="file"
        onChange={handleChange}
        accept=".json"
      />
      <br />
    </div>
  );
}
