import { userService } from "services";
import { Link } from "components";

export default Profile;

function Profile() {
  return (
    <div className="p-4">
      <div className="container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-xl-6 col-md-12">
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            className="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 className="f-w-600">
                          {userService.userValue?.firstName}
                          {" "}
                          {userService.userValue?.lastName}
                        </h6>
                        <p>{userService.userValue?.role}</p>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <a href={`/users/edit/${userService.userValue?.id}`}className="btn btn-warning">Edit</a>
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Username</p>
                              <h6 className="text-muted f-w-400">
                                {userService.userValue?.username}
                              </h6>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Number id</p>
                            <h6 className="text-muted f-w-400">
                              {userService.userValue?.id}
                            </h6>
                          </div>
                          {userService.userValue?.role === "admin" ? (
                            <>
                              <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                                Admin rights
                              </h6>
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="m-b-10 f-w-600">Manage users</p>
                                  <h6 className="text-muted f-w-400">
                                    <Link href="/users">See users</Link>
                                  </h6>
                                </div>
                                <div className="col-sm-6">
                                  <p className="m-b-10 f-w-600">
                                    Manage comments
                                  </p>
                                  <h6 className="text-muted f-w-400">
                                    <Link href="/comments">See comments</Link>
                                  </h6>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                            My_Rotten_tomatoes
                          </h6>
                          <div className="row">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">
                              {userService.userValue?.email}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
