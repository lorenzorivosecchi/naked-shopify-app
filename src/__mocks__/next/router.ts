import { NextRouter } from "next/router";

export type MockRouter = Partial<NextRouter>;

const Router: MockRouter = {
  push: jest.fn(),
};

export const useRouter = () => Router;

export default Router;
