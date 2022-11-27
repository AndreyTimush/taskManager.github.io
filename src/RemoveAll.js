function RemoveAll({ removeAllTasks }) {
  return (
    <div className="container text-center">
      <button
        onClick={removeAllTasks}
        type="reset"
        className="btn btn-danger mt-4"
      >
        clear all
      </button>
    </div>
  );
}

export default RemoveAll;
