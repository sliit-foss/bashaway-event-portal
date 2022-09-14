import { Modal, Button } from 'flowbite-react'

const Terms = ({ show, setShow, onConfirm }) => {
  return (
    <Modal
      show={show}
      onClose={() => {
        setShow(false)
      }}
    >
      <Modal.Header color="white">Confirm Participation</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">My team and I hereby conform to the rules and regulations of the competition as well as give our consent for the software created and uploaded to this website to be made open source and publicly available.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShow(false)
            onConfirm(null, true)
          }}
        >
          Agree & Continue
        </Button>
        <Button
          color="gray"
          onClick={() => {
            setShow(false)
          }}
        >
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Terms
