import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

const App = () => {
  return (
    <div className="App">
      <AmplifySignOut />
      My App
    </div>
  );
};

export default withAuthenticator(App);
