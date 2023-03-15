import genericStyles from '../../index.module.css';
import useOnboarding from '@/hooks/onboarding-manager';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { Roboto } from 'next/font/google';

const { Dragger } = Upload;
const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function InputDocumentPartial() {
  const [file, setFile] = useState<UploadFile>();
  const { executeInstance, currentStep } = useOnboarding();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('file', file as RcFile);

    executeInstance(formData);
  };

  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  return (
    <section>
      <header>
        {currentStep.status === 'failed' && (
          <div className={genericStyles.errorField}>
            <span>We couldn't verify the last document you sent.</span>
            <span>
              Please, try upload a different picture of your document.
            </span>
          </div>
        )}
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Documents
        </p>
        <p className={genericStyles.subTitle}>Now we need some documents</p>
      </header>
      <br />
      <form className={genericStyles.form} onSubmit={onSubmit}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: 'var(--primary-color)' }} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <button className={genericStyles.button} disabled={!file}>
          Next
        </button>
      </form>
    </section>
  );
}
