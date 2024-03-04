import 'package:flutter/material.dart';
import 'package:taquin/move.dart';
import 'package:taquin/reset_button.dart';
import 'package:taquin/time.dart';
import 'package:taquin/utils/bfs.dart';

class Menu extends StatelessWidget {
  Function reset;
  final int move;
  final int secondsPassed;

  Menu(this.reset, this.move, this.secondsPassed, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              ResetButton(reset),
              Move(move),
              Time(secondsPassed),
            ],
          ),
        ],
      ),
    );
  }
}
