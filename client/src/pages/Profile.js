import React from 'react';

const Profile = () => {

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <form>
        <div>
          <label>
            Student Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </div>
        <div>
        <label>
          School Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
  );
}

export default Profile;