import { describe, it, expect, vi } from "vitest";
import { flushPromises } from "@vue/test-utils";
import AucationLayout from "./AucationLayout.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import { createMockPinia, renderWithProviders, stubPage } from "../../../test-utils";
import { useUsersStore } from "../../users/states/usersStore";

describe("AucationLayout", () => {
  it("memuat profil, menampilkan konten anak, dan mengatur drawer", async () => {
    const pinia = createMockPinia();
    const spy = vi.spyOn(useUsersStore(pinia), "asyncGetProfile").mockResolvedValue(true);
    const routes = [{ path: "/", component: AucationLayout, children: [{ path: "", component: stubPage("isi-halaman") }] }];
    const { wrapper } = await renderWithProviders(AucationLayout, { routes, pinia });
    await flushPromises();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.text()).toContain("isi-halaman");
  });
});