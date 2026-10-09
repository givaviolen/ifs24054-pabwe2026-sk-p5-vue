import { describe, it, expect } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Editor from "@toast-ui/editor";
import MarkdownEditor from "./MarkdownEditor.vue";

describe("MarkdownEditor", () => {
  it("menginisialisasi Editor, emit perubahan, dan destroy saat unmount", async () => {
    const wrapper = mount(MarkdownEditor, { props: { modelValue: "halo" } });
    await flushPromises();
    const editor = Editor.last;
    expect(editor.options.initialValue).toBe("halo");
    expect(editor.options.height).toBe("260px");
    editor.options.events.change();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["markdown"]);
    wrapper.unmount();
    expect(editor.destroyed).toBe(true);
  });

  it("memakai nilai awal kosong secara default", async () => {
    mount(MarkdownEditor);
    await flushPromises();
    expect(Editor.last.options.initialValue).toBe("");
  });

  it("tidak membuat editor jika di-unmount sebelum modul termuat", async () => {
    Editor.last = undefined;
    const wrapper = mount(MarkdownEditor);
    wrapper.unmount();
    await flushPromises();
    expect(Editor.last).toBeUndefined();
  });
});