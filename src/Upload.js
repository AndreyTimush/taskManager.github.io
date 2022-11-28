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
    <>
      <input type="file" onChange={handleChange} />
      <br />
    </>
  );
}
