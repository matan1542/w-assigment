const WixBtn = ({ callback, value, classname, idx }) => {
  return (
    <button
      className={classname}
      onClick={() => callback({ name: value, idx })}
    >
      {value}
    </button>
  );
};

export default WixBtn;
