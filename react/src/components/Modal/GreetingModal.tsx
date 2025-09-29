'use client';

import { useState } from 'react';
import Modal from '.';

const GreetingModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 style={{ padding: '2rem', textAlign: 'center' }}>Hello World!</h1>
      </Modal>
    </>
  );
};

export default GreetingModal;
