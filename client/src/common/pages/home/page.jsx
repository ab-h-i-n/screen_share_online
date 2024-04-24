import React, { useState } from "react";
import Button from "../../components/Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const page = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="grid place-content-center gap-5">
      <Modal isOpen={isOpen} setOpen={setOpen} />

      <Button
        onClick={() => {
          navigate("/room/start");
        }}
        bgColor={"bg-orange-600"}
      >
        Start Share
      </Button>
      <Button onClick={() => setOpen(true)}>Join Share</Button>
    </section>
  );
};

export default page;
