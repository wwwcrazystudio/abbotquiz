import './Notification.scss';

interface Props {
  content: string;
}

const Notification = ({ content }: Props) => {
  return (
    <div className="notification">
      <div className="notification__wrap">
        <div className="notification__icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.2399 4.32803C22.4341 0.77607 17.5706 0.776077 15.7648 4.32803L2.23721 30.9352C0.621606 34.1131 2.66371 38.3307 6.47481 38.3307H33.5299C37.3411 38.3307 39.3831 34.1131 37.7676 30.9352L24.2399 4.32803ZM20.0024 13.3307C20.9229 13.3307 21.6691 14.0769 21.6691 14.9974V23.3307C21.6691 24.2512 20.9229 24.9974 20.0024 24.9974C19.0819 24.9974 18.3358 24.2512 18.3358 23.3307V14.9974C18.3358 14.0769 19.0819 13.3307 20.0024 13.3307ZM20.0024 27.4974C20.9229 27.4974 21.6691 28.2436 21.6691 29.1641V29.9974C21.6691 30.9179 20.9229 31.6641 20.0024 31.6641C19.0819 31.6641 18.3358 30.9179 18.3358 29.9974V29.1641C18.3358 28.2436 19.0819 27.4974 20.0024 27.4974Z"
              fill="#EABB16"
            />
          </svg>
        </div>

        <div
          className="notification__text"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export { Notification };