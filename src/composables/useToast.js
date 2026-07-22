export function useToast() {
  const showToast = (message, type = 'info') => {
    // Since we don't have a UI library for toast, fallback to alert
    // or console.log. In a real app this could be replaced with sweetalert2
    // or a custom toast component.
    alert(message);
  };

  return { showToast };
}
