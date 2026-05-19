'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { ApplyForm } from './ApplyForm';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function ApplyButton({ className, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        ariaTitle="Apply for a Space at The Makers Mill"
      >
        <div className="modal-head">
          <div className="label" style={{ justifyContent: 'center' }}>
            For Makers &amp; Sellers
          </div>
          <h2 className="modal-h">
            Apply for <em>a Space.</em>
          </h2>
          <p className="modal-p">
            Retail space, a studio spot, or a Vendor booth — fill this out and we&apos;ll be in
            touch.
          </p>
        </div>
        <ApplyForm />
      </Modal>
    </>
  );
}
