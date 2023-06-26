import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";

const ReactForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState("");
  const [site, setSite] = useState("");
  const [photo, setPhoto] = useState("");

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        date,
        amount,
        category,
        reason,
        photo,
        site,
      };
  
      console.log("FormData:", formData);

      const response = await axios.post(
        "http://localhost:3030/form/expense-module",
        formData
      )
      if (response) {
        alert("Expense successfully created");
      } else {
        alert("Failed to create expense");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "reactForm");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dotuzecf5/image/upload",
        formData
      );

      if (response.data.url) {
        alert("Photo uploaded successfully");
        setPhoto(response.data.url);
      } else {
        alert("Failed to upload photo");
      }
    } catch (error) {
      alert("Error uploading photo");
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", background: "#F3F4F7" }}
    >
      <Form
        className="my-form w-75 m-auto d-flex flex-column justify-content-center p-5 shadow"
        style={{ background: "#FFFFFF" }}
      >
        <div className="d-flex">
          <Form.Group className="mb-3 flex-grow-1 me-3" controlId="Date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select date"
            />
          </Form.Group>

          <Form.Group className="mb-3 flex-grow-1 me-3" controlId="Amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3 flex-grow-1" controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="d-flex">
          <Form.Group className="mb-3 flex-grow-1" controlId="Photo">
            <Form.Label>Photo</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                ref={fileInputRef}
                type="file"
                name="photo"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              {photo ? (
                <div className="">
                  <img
                    src={photo}
                    alt="Uploaded"
                    width="100"
                    height="100"
                  />
                </div>
              ) : (
                <Button
                  className="w-100 me-3"
                  variant="outline-secondary"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Photo
                </Button>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3 flex-grow-1" controlId="Site">
            <Form.Label>Site</Form.Label>
            <Form.Control
              type="text"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="Enter site URL"
            />
          </Form.Group>
        </div>

        <div className="d-flex">
          <Form.Group className="mb-3 flex-grow-1" controlId="Reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
            />
          </Form.Group>
        </div>

        <Button
          className="w-25 mt-3 ms-auto"
          variant="outline-secondary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ReactForm;
