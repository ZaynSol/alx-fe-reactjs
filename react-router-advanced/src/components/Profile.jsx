import { Route, Routes, Link, useResolvedPath, Navigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile() {
    const resolvedPath = useResolvedPath("");
    const url = resolvedPath.pathname;

    const blogPosts = [
        {id: '1234', title: "Blog post 1"},
        {id: '5678', title: "Blog post 2"}
    ]

    return (
        <div>
            <h2>Profile</h2>
            <ul>
                <li>
                    <Link to={`${url}/details`}>Profile Details</Link>
                </li>
                <li>
                    <Link to={`${url}/settings`}>Settings</Link>
                </li>
                {blogPosts.map(({ id, title }) => {
                    return (
                        <li key={id}>
                            <Link to={`${url}/bolgposts/${id}`}>{title}</Link>
                        </li>
                    )
                })}
            </ul>

            <Routes>
                <Route path="/details" element={<ProfileDetails />} />
                <Route path="/settings" element={<ProfileSettings />} />
            </Routes>
        </div>
    );
};

export default Profile;
