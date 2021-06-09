import React, { createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import RedirectToURL from './components/RedirectToURL';
import Admin from './components/Admin';
import MsgToast from './components/common/MsgToast';
import useMsg from './components/hooks/useMsg';

export const HandleMsgToast = createContext(null);

function App() {
  const [{ isMsg, msg }, setMsg] = useMsg();

  return (
    <>
      <HandleMsgToast.Provider value={{ setMsg, msg }}>
        <Router>
          <Switch>
            <Route exact path='/redirect/:shortURL' component={RedirectToURL} />
            <Route exact path='/admin' component={Admin} />
            <Redirect to='/admin' component={Admin} />
          </Switch>
        </Router>
      </HandleMsgToast.Provider>
      <MsgToast isMsg={isMsg} msg={msg} />
    </>
  );
}

export default App;
