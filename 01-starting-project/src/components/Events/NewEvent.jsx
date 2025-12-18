import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['events']});  
    navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submiting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Sil
            </Link>
            <button type="submit" className="button">
              OLuştur
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="davet oluşturulamadı!"
          message={
            error.info?.message ||
            "Davet oluşturulmadı. Lütfen verdiğiniz bilgelerin tam olduğundan emin olup yeniden deneyiniz."
          }
        />
      )}
    </Modal>
  );
}