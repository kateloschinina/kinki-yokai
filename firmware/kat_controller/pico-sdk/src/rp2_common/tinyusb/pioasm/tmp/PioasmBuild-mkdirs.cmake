# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/katerinaloschinina/pico/pico-sdk/tools/pioasm"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pioasm"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/tmp"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/src/PioasmBuild-stamp"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/src"
  "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/src/PioasmBuild-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/src/PioasmBuild-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/katerinaloschinina/github_projects/kinki-yokai/firmware/kat_controller/pico-sdk/src/rp2_common/tinyusb/pioasm/src/PioasmBuild-stamp${cfgdir}") # cfgdir has leading slash
endif()