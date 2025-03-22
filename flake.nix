{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, ... }:
    let
    system = "x86_64-linux";
  pkgs = import nixpkgs { inherit system; };
  in 
  {
    devShells.${system}.default = pkgs.mkShell {
      packages = [
        pkgs.nodejs_22
        pkgs.pnpm
        pkgs.typescript-language-server
        pkgs.emmet-language-server
        pkgs.svelte-language-server
      ];
    };
  };
}
