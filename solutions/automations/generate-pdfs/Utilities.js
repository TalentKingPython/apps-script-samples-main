/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a Google Drive folder in the same location 
 * in Drive where the spreadsheet is located. First, it checks if the folder
 * already exists and returns that folder. If the folder doesn't already
 * exist, the script creates a new one. The folder's name is set by the
 * "OUTPUT_FOLDER_NAME" variable from the Code.gs file.
 *
 * @param {string} folderName - Name of the Drive folder. 
 * @return {object} Google Drive Folder
 */
function getFolderByName_(folderName) {

  // Gets the Drive Folder of where the current spreadsheet is located.
  const ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const parentFolder = DriveApp.getFileById(ssId).getParents().next();

  // Iterates the subfolders to check if the PDF folder already exists.
  const subFolders = parentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === folderName) {
      return folder;
    }
  }
  // Creates a new folder if one does not already exist.
  return parentFolder.createFolder(folderName)
    .setDescription(`Created by ${APP_TITLE} application to store PDF output files`);
}

/**
 * Test function to run getFolderByName_.
 * @prints a Google Drive FolderId.
 */
function test_getFolderByName() {

  // Gets the PDF folder in Drive.
  const folder = getFolderByName_(OUTPUT_FOLDER_NAME);

  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rDescription: ${folder.getDescription()}`)
  // To automatically delete test folder, uncomment the following code:
  // folder.setTrashed(true);
}