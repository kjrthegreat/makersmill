'use client';

// Small client wrapper so a server-action delete gets a confirm() prompt.
export function DeleteButton({
  action,
  what,
}: {
  action: () => void | Promise<void>;
  what: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${what}"? This can't be undone.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="admin-btn-del">Delete</button>
    </form>
  );
}
