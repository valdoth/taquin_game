import 'dart:io';
import 'package:process_run/cmd_run.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter/services.dart';
import 'dart:convert';

String getPythonScript() {
  return 'assets/scripts/taquin.py';
}

List<List<int>> parseStringToListOfLists(String stringRepresentation) {
  // Parse the string into a dynamic object
  var parsedObject = jsonDecode(stringRepresentation);

  // Convert the dynamic object into a List<List<int>>
  // List<List<int>> listOfLists =
  //     parsedObject.map<List<int>>((list) => list.cast<int>()).toList();
  List<List<int>> listOfLists = parsedObject
      .map<List<int>>((list) => List<int>.from(list.cast<int>()))
      .toList();

  return listOfLists;
}

Future<List<List<int>>> bfs(List<int> numbers) async {
  // Get the path to the script in the app's assets
  const scriptPath = 'assets/scripts/taquin.py';
  final scriptBytes = await rootBundle.load(scriptPath);
  final scriptContent = scriptBytes.buffer.asUint8List();

  // Get the path to the app's temporary directory
  final tempDir = await getTemporaryDirectory();
  // final tempScriptPath = '${tempDir.path}/taquin.py';
  const tempScriptPath = 'assets/scripts/taquin.py';
  print(tempDir.path);

  // Write the script to the temporary directory
  final file = File(tempScriptPath);
  await file.writeAsBytes(scriptContent);

  // Run the script
  String numbersJson = jsonEncode(numbers);

  final result =
      await runCmd(ProcessCmd('python3', [tempScriptPath, numbers.toString()]));

  List<List<int>> listOfLists = parseStringToListOfLists(result.stdout);
  print(listOfLists);

  return listOfLists;
}
