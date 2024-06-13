import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../../firebase";

class MyUploadAdapter {
  loader: any;

  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve({ default: reader.result });
      });

      reader.addEventListener("error", (err) => {
        reject(err);
      });

      reader.addEventListener("abort", () => {
        reject();
      });

      this.loader.file.then((file) => {
        reader.readAsDataURL(file);
      });
    });
  }
}

const Editor = ({ data = "", handleChange }) => {
  // function MyUploadAdapter(loader) {
  //   return {
  //     upload: () => {
  //       return new Promise((resolve, reject) => {
  //         const body = new FormData();
  //         loader.file.then((file) => {
  //           body.append("files", file);
  //           const storageRef = ref(storage, "tasks");
  //           const profileRef = ref(storageRef, file.name);
  //           uploadBytes(profileRef, file).then((snapshot) => {
  //             getDownloadURL(snapshot.ref).then((url: string) => {
  //               return url;
  //             });
  //           });
  //         });
  //       });
  //     },
  //   };
  // }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      config={{ extraPlugins: [uploadPlugin] }}
      data={data}
      editor={ClassicEditor}
      onChange={(event, editor: { getData: () => string }) => {
        const data = editor.getData();
        handleChange(data);
      }}
    />
  );
};

export default Editor;
