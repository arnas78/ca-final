import { ContentProvider } from "./Content";

function MainProvider({ children }) {
  return <ContentProvider>{children}</ContentProvider>;
}

export default MainProvider;
