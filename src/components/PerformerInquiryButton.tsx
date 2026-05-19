'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { PerformerForm } from './PerformerForm';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function PerformerInquiryButton({ className, children }: Props) {
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
        ariaTitle="Stage / Performer Inquiry at The Makers Mill"
      >
        <div className="modal-head">
          <div className="label" style={{ justifyContent: 'center' }}>
            For Performers
          </div>
          <h2 className="modal-h">
            Play <em>The Stage.</em>
          </h2>
          <p className="modal-p">
            Bands, songwriters, comedians, organizers — fill this out and we&apos;ll be in touch.
          </p>
        </div>
        <PerformerForm />
      </Modal>
    </>
  );
}
