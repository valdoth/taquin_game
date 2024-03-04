import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:taquin/board.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  runApp(const SlidingPuzzle());
}

class SlidingPuzzle extends StatelessWidget {
  const SlidingPuzzle({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "sliding Puzzle",
      debugShowCheckedModeBanner: false,
      home: Board(),
    );
  }
}
