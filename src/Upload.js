export default function Upload({ addTaskFromFile }) {
  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const arrayOfObjects = JSON.parse(e.target.result);
      addTaskFromFile(arrayOfObjects);
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
