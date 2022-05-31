interface EditorProps {
  onSave: (data: any) => void;
  children?: React.ReactNode;
  json?: string;
  data?:
    | false
    | {
        title: string;
        targets: string;
        once: number;
      };
}
interface PreviewModalProps {
  onClose: () => void;
  isOpen: boolean;
  data: any;
  title: React.ReactNode;
}
