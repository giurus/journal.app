import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handlePicture = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  return (
    <div className="notes__appbar">
      <span>28 de Diciembre del 2021</span>
      <input
        type="file"
        onChange={handleFileChange}
        name="file"
        id="fileSelector"
        hidden="hidden"
      />
      <div>
        <button className="btn" onClick={handlePicture}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
