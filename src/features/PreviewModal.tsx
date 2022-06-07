import { Editor, Frame } from "@appquality/craft-blocks";
import { Modal } from "@appquality/appquality-design-system";

export const PreviewModal = ({
  isOpen,
  onClose,
  title,
  data,
}: PreviewModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={() => onClose()} size="mid">
      <Editor
        enabled={false}
        context={{
          resolveDynamicContent: true,
          resolver: () => {
            return new Promise((resolve) => {
              resolve({
                Profile: {
                  id: "1987",
                  name: "Pippo",
                  surname: "Franco",
                },
              });
            });
          },
        }}
      >
        <div className="aq-m-3">{data && <Frame data={data} />}</div>
      </Editor>
    </Modal>
  );
};
