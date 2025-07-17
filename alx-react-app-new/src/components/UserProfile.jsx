// src/components/UserProfile.jsx

const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '15px',
        margin: '15px',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h2
        style={{
          color: 'blue',
          fontSize: '24px',
          marginBottom: '10px',
        }}
      >
        {props.name}
      </h2>
      <p style={{ fontSize: '18px' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>{props.bio}</p>
    </div>
  );
};

export default UserProfile;
