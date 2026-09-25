import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

function NavigationFixture() {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate("/movie/tt10872600")}>Abrir filme</button>;
}

test("retorna ao topo quando a rota muda", () => {
  window.scrollTo = jest.fn();
  render(
    <MemoryRouter initialEntries={["/movies"]}>
      <ScrollToTop />
      <NavigationFixture />
    </MemoryRouter>
  );

  window.scrollTo.mockClear();
  fireEvent.click(screen.getByRole("button", { name: "Abrir filme" }));

  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
});
